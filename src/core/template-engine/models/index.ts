import {TRecord} from "~/src/models/common"

export enum EContextKeys {
    Components = "components",
    Data = "data",
    Options = "options",
    Slots = "slots",
}

export enum ERegExpKeys {
    Bem = "blockAlias",
    Comp = "component",
    Data = "regExpData",
    Each = "forEach",
    Slot = "slot",
}

export type TRegExpReplacerKeys = Exclude<ERegExpKeys, ERegExpKeys.Slot>

export type TRegExpGroup = Partial<{amp: string; item: string; keys: string}>

// Context
type TComponents<T> = TRecord<T>

type TData = TRecord

type TOptions = {bemBlock: string}

type TSlots = TRecord<string>

export type TContextCategory<T> = TComponents<T> | TData | TOptions | TSlots

export type TContext<T> = Partial<{
    [EContextKeys.Data]: TData
    [EContextKeys.Components]: TComponents<T>
    [EContextKeys.Options]: TOptions
    [EContextKeys.Slots]: TSlots
}>

// Replacers
export type TRegExpReplacerWrapper = (
    match: string,
    groups: TRecord | undefined,
    currentMatch: RegExpExecArray,
) => string

type TRegExpReplacer = (
    context: TContextCategory<unknown>,
    match: string,
    groups: TRegExpGroup | undefined,
    currentMatch?: RegExpExecArray,
) => string

export type TRegExpReplacers = Record<TRegExpReplacerKeys, TRegExpReplacer>

// Factory
export type TFactory<T> = {instance: T}
