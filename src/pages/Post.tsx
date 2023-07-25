import { useParams, Link } from 'react-router-dom'
import { Profile } from '../components/Profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faChevronLeft,
  faComment,
  faExternalLink,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { getDaysDistance } from '../services/getDaysDistance'

type RouteParams = {
  id: string
}

type IssueResponse = {
  title: string
  html_url: string
  body: string
  comments: number
  created_at: string
  user: {
    login: string
  }
}

type Issue = {
  daysDistance: number
} & IssueResponse

export function Post() {
  const { id } = useParams<RouteParams>()

  const [issue, setIssue] = useState<Issue | null>(null)

  useEffect(() => {
    async function loadIssueData() {
      const { data } = await api.get<IssueResponse>(
        `/repos/facebook/react/issues/${id}`,
      )

      setIssue({
        ...data,
        daysDistance: getDaysDistance(new Date(data.created_at)),
      })
    }

    loadIssueData()
  }, [id])

  return (
    <div className="flex flex-col items-center max-w-[864px] w-full">
      <Profile.Root>
        <Profile.ContentContainer>
          <Profile.ContentHeader>
            <Link
              className="font-default text-blue font-bold text-xs h-min"
              to="/"
            >
              <FontAwesomeIcon icon={faChevronLeft} /> VOLTAR
            </Link>

            <a
              className="font-default text-blue font-bold text-xs h-min"
              href={issue?.html_url}
              target="blank"
            >
              VER NO GITHUB <FontAwesomeIcon icon={faExternalLink} />
            </a>
          </Profile.ContentHeader>

          <h1 className="text-base-title font-default font-bold text-2xl leading-default mt-2">
            {issue?.title}
          </h1>

          <Profile.Footer>
            <Profile.FooterItem>
              <FontAwesomeIcon
                icon={faGithub}
                className="text-base-label text-lg"
              />
              {issue?.user.login}
            </Profile.FooterItem>

            <Profile.FooterItem>
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-base-label text-lg"
              />
              Há {issue?.daysDistance} dia
            </Profile.FooterItem>

            <Profile.FooterItem>
              <FontAwesomeIcon
                icon={faComment}
                className="text-base-label text-lg"
              />{' '}
              {issue?.comments} comentários
            </Profile.FooterItem>
          </Profile.Footer>
        </Profile.ContentContainer>
      </Profile.Root>

      <p className="font-default text-base-subtitle mt-4">{issue?.body}</p>
    </div>
  )
}
