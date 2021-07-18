const last = <T>(arr: T[]) => arr[arr.length - 1]

const ignoreRegex = /(<[^>]+>)/g

const stripIgnored = (x: string) => x.replace(ignoreRegex, '')

const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1)

type ConcatOptions = {
	customWords: string[]
}

const _sentenceize = (customWords: string[]) => (str: string) => {
	let wordIdx = -1

	return str
		.split(ignoreRegex)
		.map((s, i) =>
			i % 2
				? s
				: s.replace(/\w+/g, (w) => {
						++wordIdx

						const customWord = customWords.find(
							(c) => c.toLowerCase() === w.toLowerCase(),
						)

						if (customWord) return customWord

						return wordIdx === 0
							? capitalize(w.toLowerCase())
							: w.toLowerCase()
				  }),
		)
		.join('')
}

const isUpperCase = (str: string) =>
	stripIgnored(str) === stripIgnored(str).toUpperCase()

const sentenceize = (customWords: string[]) => (str: string) =>
	isUpperCase(str) ? _sentenceize(customWords)(str) : str

export type Row = [tsStart: string, tsEnd: string, chunk: string]

export const toCellMatrix = (csv: string) =>
	csv
		.trim()
		.split('\n')
		.map((x) => x.split('\t').map((x) => x.trim()) as Row)

export type Concated = {
	ts: [string, string]
	sentence: string
}[]

export const concat =
	({ customWords }: ConcatOptions) =>
	(rows: Row[]): Concated =>
		rows
			.reduce((acc, [tsStart, tsEnd, chunk]) => {
				if (
					!acc.length ||
					/[.?!]$/.test(stripIgnored(last(last(acc).chunks)))
				) {
					acc.push({ ts: [], chunks: [] })
				}

				last(acc).ts.push(tsStart)
				last(acc).ts.push(tsEnd)

				last(acc).chunks.push(chunk)

				return acc
			}, [])
			.map(({ ts, chunks }) => ({
				ts: [ts[0], last(ts)],
				sentence: chunks
					.join(' ')
					.split('.')
					.map(sentenceize(customWords))
					.join('.'),
			}))

export const toCsv = (concated: Concated) =>
	concated.map(({ ts, sentence }) => [...ts, sentence].join('\t')).join('\n')

const FRAME_RATE = 30

const clamp = (a: number, b: number) => (n: number) =>
	[a, b, n].sort((a, b) => b - a)[1]

const toMs = (frameRate: number) => (frames: number) =>
	clamp(0, 999)(Math.round((frames / frameRate) * 1000))

const fmtTs = (frameRate: number) => (ts: string) => {
	const [frames, ...rest] = ts.split(':').reverse()

	const ms = String(toMs(frameRate)(Number(frames))).padStart(3, '0')

	return [rest.reverse().join(':'), ms].join('.')
}

const fmtSentence = (sentence: string) => `- ${sentence}`

export const toVtt = (concated: Concated) =>
	concated
		.reduce(
			(acc, { ts, sentence }) => {
				const entry = [
					ts.map(fmtTs(FRAME_RATE)).join(' --> '),
					fmtSentence(sentence),
				].join('\n')

				return [...acc, entry]
			},
			['WEBVTT'],
		)
		.join('\n\n')

// WEBVTT

// 00:01.000 --> 00:04.000
// - Never drink liquid nitrogen.

// 00:05.000 --> 00:09.000
// - It will perforate your stomach.
// - You could die.
