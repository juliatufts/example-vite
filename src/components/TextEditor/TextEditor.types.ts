import { TextStyles } from "../TextEditorOptions";

export interface TextEditorProps {
  id: string;
}

export interface TextBlock {
  id: string;
  content: string;
  styles: TextStyles;
}
