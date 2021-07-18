import { useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { concat, Concated, Row, toVtt } from './concatSubtitles'
import Excel from 'exceljs'
import JSZip from 'jszip'

export const readFile = (file: File) =>
	new Promise<ArrayBuffer>((res) => {
		const reader = new FileReader()

		reader.onload = (e) => res(e.target!.result as ArrayBuffer)

		reader.readAsArrayBuffer(file)
	})

export const writeFile = (
	filename: string,
	buf: Buffer | Uint8Array | Blob,
	mimeType: string,
) => {
	const blob = new Blob([buf], {
		type: mimeType,
	})

	const link = document.createElement('a')

	link.href = window.URL.createObjectURL(blob)

	const fileName = filename

	link.download = fileName
	link.click()
}

const init = {
	customWords: 'LED,V,AC,DC,DP,CP,ISO,E,I,R',
}

const defaultValues: typeof init =
	JSON.parse(localStorage.getItem('form') ?? 'null') ?? init

delete (defaultValues as any).file

export const App = () => {
	const { register, watch, handleSubmit } = useForm({
		defaultValues,
	})

	const changeHandler = (data: any) => {
		delete data.file

		localStorage.setItem('form', JSON.stringify(data))
	}

	const files: FileList = useMemo(
		() => watch('file') ?? ([] as any as FileList),
		[watch],
	)

	const customWords = useRef(
		(watch('customWords')?.split(',') ?? []).map((x) => x.trim()),
	)

	useEffect(() => {
		customWords.current = watch('customWords')?.split(',') ?? []
	}, [watch])

	// const [workbook, setWorkbook] = useState<Excel.Workbook | null>(null)

	useEffect(() => {
		if (!files.length) return
		;(async () => {
			const file = files[0]
			const data = await readFile(file)

			const workbook = new Excel.Workbook()
			await workbook.xlsx.load(data)

			type Sheet = Row[]

			const sheets: Sheet[] = []

			workbook.eachSheet((sheet, sheetId) => {
				const _sheet = [] as any as Sheet

				sheets[sheetId] = _sheet

				sheet.eachRow((row, rowNumber) => {
					if (rowNumber === 1) return

					const _row = [] as any as Row

					_sheet.push(_row)

					row.eachCell((cell) => {
						_row.push(String(cell.value))
					})
				})
			})

			const c = [...sheets.entries()].reduce((acc, [id, val]) => {
				if (!val) return acc

				acc[id] = concat({ customWords: customWords.current })(val)

				return acc
			}, [] as Concated[])

			workbook.eachSheet((sheet, sheetId) => {
				sheet.properties.defaultRowHeight = 0

				sheet.columns.forEach((col, i) => {
					if ([0, 1].includes(i)) {
						col.width = 12
					}
				})

				sheet.eachRow((row, rowNumber) => {
					if (rowNumber === 1) return

					row.eachCell((cell, colNumber) => {
						const { ts, sentence } =
							c[sheetId]?.[
								rowNumber - 2
								/* -1 for 0 indexing, -1 for header row */
							] ?? ({} as any)

						switch (colNumber) {
							case 1:
								cell.alignment = {
									vertical: 'top',
									horizontal: 'left',
									wrapText: true,
								}
								cell.value = ts?.[0]

								break
							case 2:
								cell.alignment = {
									vertical: 'top',
									horizontal: 'left',
									wrapText: true,
								}
								cell.value = ts?.[1]

								break
							case 3:
								cell.alignment = {
									vertical: 'top',
									horizontal: 'left',
									wrapText: true,
								}
								cell.value = sentence

								break
							default:
								cell.value = undefined
						}
					})
				})
			})

			// setWorkbook(workbook)

			const buf = await workbook.xlsx.writeBuffer()

			const toWrite: {
				filename: string
				content: Buffer | Uint8Array
				mimeType: string
			}[] = []

			const fileNameSansExt = `${file.name
				.split('.')
				.slice(0, -1)
				.join('.')}_concat`

			toWrite.push({
				filename: `${fileNameSansExt}.xlsx`,
				content: buf as Buffer,
				mimeType:
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			})

			c.map(toVtt).forEach((vtt, idx) => {
				toWrite.push({
					filename: `${
						workbook.worksheets.find((x) => x.id === idx).name
					}.vtt`,
					content: new TextEncoder().encode(vtt),
					mimeType: 'text/plain',
				})
			})

			const zip = new JSZip()

			toWrite.forEach(({ filename, content, mimeType }) => {
				zip.file(filename, content, {})
			})

			const content = await zip.generateAsync({ type: 'blob' })

			writeFile(
				`${fileNameSansExt}_${new Date().toISOString()}.zip`,
				content,
				'application/zip',
			)
		})()
	}, [files])

	return (
		<form onChange={handleSubmit(changeHandler)}>
			<br />
			<label>
				Upload file (XLSX)
				<input type='file' name='file' ref={register} />
			</label>
			<br />
			<br />
			<label>
				Words not to lower-case (comma separated, case sensitive for
				output)
				<textarea name='customWords' ref={register} />
			</label>
		</form>
	)
}
