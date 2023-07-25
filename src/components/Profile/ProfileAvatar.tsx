interface ProfileAvatarProps {
  url: string
  alt: string
}

export function ProfileAvatar({ alt, url }: ProfileAvatarProps) {
  return <img src={url} alt={alt} className="max-w-[148px] rounded-lg" />
}
