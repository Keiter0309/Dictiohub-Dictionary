export interface WordContentProps {
    onSubmit: (
        word: string,
        meaning: string,
        example: string,
        category: string
    ) => void;
}

export interface WordContentState {
    
    word: string;
    meaning: string;
    example: string;
    category: string;
}