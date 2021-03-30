import { BigNumber, Contract } from 'ethers'

type Options = {
	readonly contract: Contract
}

type Attributes = {
	readonly subject: string
	readonly body: string
	readonly period: BigNumber
	readonly options: readonly string[]
	readonly bodyMimeType: string
	readonly optionsMimeType: string
}

const fetcher = async (url: string): Promise<string> => {
	const res = await fetch(url)
	return res.text()
}

export const attributes = async ({
	contract,
}: Options): Promise<Attributes> => {
	const results: Attributes = await contract.functions.attributes()
	return results
}

export const parseAttributes = async (
	attrs: Attributes
): Promise<Attributes> => {
	const { body: _body, options: _options } = attrs
	const results = await Promise.all([
		fetcher(_body),
		Promise.all(_options.map(fetcher)),
	])
	const [body, options] = results
	return {
		...attrs,
		body,
		options,
	}
}
