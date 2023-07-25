import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Profile } from '../components/Profile'
import {
  faBuilding,
  faExternalLink,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { SearchForm } from '../components/SearchForm'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { api } from '../services/api'
import { useDebounce } from '../hooks/useDebounce'
import { getDaysDistance } from '../services/getDaysDistance'

type UserData = {
  id: number
  login: string
  html_url: string
  avatar_url: string
  name: string
  company: string
  followers: number
}

type IssueResponse = {
  id: number
  number: number
  title: string
  body: string
  created_at: string
}

type IssueData = {
  daysDistance: number
} & IssueResponse

const ISSUE_BODY_MAX_SIZE = 170
const ISSUE_TITLE_MAX_SIZE = 25

export function Home() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState<UserData | null>(null)
  const [filteredIssues, setFilteredIssues] = useState<IssueData[]>([])
  const initialIssues = useRef<IssueData[]>([])

  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 300)

  useEffect(() => {
    async function loadPageData() {
      const userRequest = api.get<UserData>('users/acferM')
      const issuesRequest = api.get<IssueResponse[]>(
        'repos/facebook/react/issues',
      )

      const [{ data: userResponse }, { data: issuesResponse }] =
        await Promise.all([userRequest, issuesRequest])

      const formattedIssues: IssueData[] = issuesResponse.map((issue) => {
        return {
          ...issue,
          title: issue.title.substring(0, ISSUE_TITLE_MAX_SIZE) + '...',
          body: issue.body.substring(0, ISSUE_BODY_MAX_SIZE) + '...',
          daysDistance: getDaysDistance(new Date(issue.created_at)),
        }
      })

      setUserData(userResponse)
      setFilteredIssues(formattedIssues)
      initialIssues.current = formattedIssues
    }

    loadPageData()
  }, [])

  useEffect(() => {
    if (!debouncedInputValue) {
      setFilteredIssues(initialIssues.current)
      return
    }

    const filtered = initialIssues.current.filter(
      (issue) =>
        issue.body.includes(debouncedInputValue) ||
        issue.title.includes(debouncedInputValue),
    )

    setFilteredIssues(filtered)
  }, [debouncedInputValue])

  return (
    <div className="flex flex-col items-center max-w-[864px] w-full">
      <Profile.Root>
        <Profile.Avatar
          url={userData?.avatar_url || ''}
          alt={`${userData?.name} avatar`}
        />

        <Profile.ContentContainer>
          <Profile.ContentHeader>
            <h1 className="font-default text-2xl font-bold leading-default text-base-title ">
              {userData?.name}
            </h1>

            <a
              className="font-default text-blue font-bold text-xs h-min"
              href={userData?.html_url}
              target="blank"
              rel="noreferrer"
            >
              GITHUB <FontAwesomeIcon icon={faExternalLink} />
            </a>
          </Profile.ContentHeader>

          <Profile.Content>
            Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu
            viverra massa quam dignissim aenean malesuada suscipit. Nunc,
            volutpat pulvinar vel mass.
          </Profile.Content>

          <Profile.Footer>
            <Profile.FooterItem>
              <FontAwesomeIcon
                icon={faGithub}
                className="text-base-label text-lg"
              />
              {userData?.login}
            </Profile.FooterItem>

            <Profile.FooterItem>
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-base-label text-lg"
              />
              {userData?.company}
            </Profile.FooterItem>

            <Profile.FooterItem>
              <FontAwesomeIcon
                icon={faUserGroup}
                className="text-base-label text-lg"
              />
              {userData?.followers} seguidores
            </Profile.FooterItem>
          </Profile.Footer>
        </Profile.ContentContainer>
      </Profile.Root>

      <main className="flex flex-col mt-[4.5rem] w-full gap-12">
        <SearchForm onChange={setInputValue} />

        <div className="grid grid-cols-2 gap-8">
          {filteredIssues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => navigate(`post/${issue.number}`)}
              className="bg-base-post rounded-lg p-8 h-[260px] text-left transition-all hover:outline hover:outline-blue"
            >
              <header className="flex justify-between gap-4">
                <h1 className="text-base-title font-default font-bold leading-default text-xl">
                  {issue.title}
                </h1>

                <span className="text-base-span font-default leading-default text-sm whitespace-nowrap">
                  Há {issue.daysDistance} dias
                </span>
              </header>

              <p className="text-base-text font-default leading-default text-base mt-5">
                {issue.body}
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
