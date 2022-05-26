interface ITeamMate {
  id: number;
  avatarLink: string;
  gitHubLink: string;
}

export const team: ITeamMate[] = [
  { id: 1, avatarLink: './avatar_sergey.png', gitHubLink: 'https://github.com/SergeyKagal' },
  { id: 2, avatarLink: './avatar_raya.png', gitHubLink: 'https://github.com/ravgusha' },
  { id: 3, avatarLink: './avatar_elena.png', gitHubLink: 'https://github.com/elvehnn' },
];
