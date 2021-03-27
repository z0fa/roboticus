import ResHelper from "./helpers/res-helper";

export type snowflake = string;
export type timestamp = string;

export interface ApplicationCommand {
  id: snowflake;
  application_id: snowflake;
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
}

export interface ApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
}

export interface ApplicationCommandOptionChoice {
  name: string;
  value: string | number;
}

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

export interface Interaction {
  id: snowflake;
  type: InteractionType;
  data?: ApplicationCommandInteractionData;
  guild_id?: snowflake;
  channel_id?: snowflake;
  member?: GuildMember;
  user?: User;
  token: string;
  version: number;
}

export enum InteractionType {
  Ping = 1,
  ApplicationComman = 2,
}

export interface ApplicationCommandInteractionData {
  id: snowflake;
  name: string;
  options?: ApplicationCommandInteractionDataOption[];
}

export interface ApplicationCommandInteractionDataOption {
  name: string;
  value?: any;
  options?: ApplicationCommandInteractionDataOption[];
}

export interface GuildMember {
  user?: User;
  nick?: string;
  roles: snowflake[][];
  joined_at: timestamp;
  premium_since?: timestamp;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
}

export interface User {
  id: snowflake;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: UserFlag;
  premium_type?: PremiumType;
  public_flags?: UserFlag;
}

export enum UserFlag {
  None = 0,
  DiscordEmployee = 1 << 0,
  PartneredServerOwner = 1 << 1,
  HypeSquadEvents = 1 << 2,
  BugHunterLevel1 = 1 << 3,
  HouseBravery = 1 << 6,
  HouseBrilliance = 1 << 7,
  HouseBalance = 1 << 8,
  EarlySupporter = 1 << 9,
  TeamUser = 1 << 10,
  System = 1 << 12,
  BugHunterLevel2 = 1 << 14,
  VerifiedBot = 1 << 16,
  EarlyVerifiedBotDeveloper = 1 << 17,
}

export enum PremiumType {
  None = 0,
  NitroClassic = 1,
  Nitro = 2,
}

export interface InteractionResponse {
  type: InteractionResponseType;
  data?: InteractionApplicationCommandCallbackData;
}

export enum InteractionResponseType {
  Pong = 1,
  Acknowledge = 2,
  ChannelMessage = 3,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource = 5,
}

export interface InteractionApplicationCommandCallbackData {
  tts?: boolean;
  content?: string;
  embeds?: Embed[];
  allowed_mentions?: AllowedMentions;
  flags?: InteractionApplicationCommandCallbackDataFlag;
}

export enum InteractionApplicationCommandCallbackDataFlag {
  Ephemeral = 64,
}

export interface AllowedMentions {
  parse: AllowedMentionType[];
  roles: snowflake[][];
  users: snowflake[][];
  replied_user: boolean;
}

export interface Embed {
  title?: string;
  type?: EmbedType;
  description?: string;
  url?: string;
  timestamp?: timestamp;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

export enum EmbedType {
  rich = "rich",
  image = "image",
  video = "video",
  gifv = "gifv",
  article = "article",
  link = "link",
}

export interface EmbedFooter {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedImage {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedThumbnail {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedVideo {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

export interface EmbedProvider {
  name: string;
  url: string;
}

export interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export enum AllowedMentionType {
  RoleMentions = "roles",
  UserMentions = "users",
  EveryoneMentions = "everyone",
}

export interface MessageInteraction {
  id: snowflake;
  type: InteractionType;
  name: string;
  user: User;
}

export type BotCommand = Omit<ApplicationCommand, "id" | "application_id"> & {
  handler: (req: Interaction, res: ResHelper) => InteractionResponse;
};
