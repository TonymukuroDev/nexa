export interface IProfile {
    username: string;
    bio: string;
    status: string;
    lastSeen: string
    updatedAt: string
}


export enum ProfileStatus {
    ONLINE = "online",
    OFFLINE = "offline"
}