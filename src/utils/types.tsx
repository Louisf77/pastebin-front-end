export interface IPaste {
  paste_id: number;
  paste_title?: string | null;
  paste_text: string | null;
  time: string | null;
}

export interface CommentInputProps {
  openPaste: IPaste;
}

export interface IComment {
  comment_id: number;
  comment?: string;
}
