export type InputProps = {
  label?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export type FormState = {
  name: string
  owner: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  password: string
  hasDelivery: string
  logo: FileList
}