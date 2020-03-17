export interface ITreeData {
  key: string;
  id: number;
  label: string;
  show?: boolean;
  title?: JSX.Element;
  children?: ITreeData[];
}

export interface ITreeItemProp {
  title: string;
  show: boolean;
  id: number;
  treeData: ITreeData[];
  freshData: (data: ITreeData[]) => void;
}
