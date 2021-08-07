export interface VMComponent {
  id: string;
  name: string;
  image?: string;
  children: string[];
  isChild: boolean;
  props: VMProp[];
}

export interface VMProp {
  name: string;
  value: string;
  type: string;
  description: string;
}
