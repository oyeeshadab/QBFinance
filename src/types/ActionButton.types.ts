export enum BtnType {
  CREATE = 'create',
  DELETE = 'delete',
}
export interface ActionButtonProps {
  title: string;
  icon?: {
    name: string;
    library: string;
  };
  onPress: () => void;
  type?: BtnType;
}
