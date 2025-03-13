export interface IArchiveUrl {
  url: string;
}

export interface IArchiveResponse {
  file: {
    data: number[];
    type: string;
  };
}
