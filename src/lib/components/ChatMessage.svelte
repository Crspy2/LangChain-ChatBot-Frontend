<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import { marked } from 'marked'
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'
	import CodeBlock from './markdown/CodeBlock.svelte';
	import InlineCode from './markdown/InlineCode.svelte';
	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string

	console.log(message)
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			<img
				src="https://ui-avatars.com/api/?name={type === 'user' ? 'Me' : 'B'}"
				alt="{type} avatar"
			/>
		</div>
	</div>
	<div class="chat-header">
		{type === 'user' ? 'Me' : 'Bot'}
	</div>
	<div class="chat-bubble {type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}">
		<SvelteMarkdown source={marked.lexer(message)} renderers={{code: CodeBlock, codespan: InlineCode}}/>
	</div>
</div>
