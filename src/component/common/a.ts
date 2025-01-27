import { html, TemplateResult } from 'lit-html'
import { route } from '../../store/route'

type Props = {
	readonly href: string
	readonly children: TemplateResult | string
}

const handler = (url: string) => (e: Event) => {
	// eslint-disable-next-line functional/no-expression-statement
	e.preventDefault()
	// eslint-disable-next-line functional/no-expression-statement
	route.next(url)
}

export const a = (props: Props): TemplateResult =>
	props.href.startsWith('//')
		? html` <a href="${props.href}">${props.children}</a> `
		: html`
				<a href="${props.href}" @click="${handler(props.href)}"
					>${props.children}</a
				>
		  `
