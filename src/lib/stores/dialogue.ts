
export interface DialogueSequence {
    message: string,
    duration: number
}

export const openingMessages: DialogueSequence[] = [
    {
        message: 'Hey! We have a visitor!',
        duration: 3000
    },
    {
        message: 'Stephen isn\'t here right now.',
        duration: 3000
    },
    {
        message: 'I\'d be more than happy to give you a tour myself.',
        duration: 4000
    },
    {
        message: 'What do you say? I\'m Mr. Marble by the way.',
        duration: 4000
    },
    {
        message: 'I watch the place while he\'s gone.',
        duration: 4000
    },
    {
        message: '',
        duration: 10000
    },
    {
        message: 'I don\'t bite... 😢',
        duration: 3000
    }
];

export const repeatVisitorMessages: DialogueSequence[] = [
    {
        message: 'Hi welcome back!  😁',
        duration: 3000
    },
    {
        message: 'Have you seen Stephen? I\'m looking for him too.',
        duration: 3000
    },
    {
        message: '',
        duration: 4000
    }, 
];