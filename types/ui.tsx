export type InputProps = {
    label?: string;
    type?:string;
    name?:string;
    value?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    variant?: 'input' | 'textarea' | 'select';
    options?: {label: string; value: string} [];
    error?: string;
    disabled?: boolean;
    rows?: number; 
    className?: string;
}