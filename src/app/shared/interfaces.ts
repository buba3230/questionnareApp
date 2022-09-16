export interface TypeInterface {
    id: number;
    name: string;
}

export interface AnsweredOptionsInterface {
    a: string;
    b: string;
    c?: string;
}

export interface QuestionInterface {
    id: number;
    text: string;
    type: number;
    answeredOptions: AnsweredOptionsInterface;
    answer?: AnswerInterface;
    creatingDate: Date;
}

export interface QuestionListItemInterface {
    id: number;
    text: string;
    type: string;
    creatingDate: Date;
}

export interface AnswerInterface {
    id: number;
    selPropositions: string[];
    openAnswer: string;
    answerDate: Date;
}

export interface NormalizeAnswerInterface {
    id: number;
    a: string;
    b: string;
    c: string;
    openAnswer: string;
}