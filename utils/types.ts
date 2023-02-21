export interface IActiveDetails {
  id: string;
  title: string;
  start: string;
  services: string[];
  attachments: Blob[] | MediaSource[];
  create?: boolean;
}
