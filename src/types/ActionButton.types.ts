export enum BtnType {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update',
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
