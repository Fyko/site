import type { Join, Utility } from 'typestr';

export function rand<EntryType>(arr: EntryType[]): EntryType {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function join<ArrayInput extends readonly string[], Separator extends string>(
	arr: ArrayInput[],
	sep: Separator,
) {
	return arr.join(sep) as Join<Utility.Writable<ArrayInput>, Separator>;
}
