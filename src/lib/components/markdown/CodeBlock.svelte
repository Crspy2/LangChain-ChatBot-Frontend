<script lang="ts">
    import Icon from 'svelte-icons-pack/Icon.svelte'
    import BsClipboard from "svelte-icons-pack/bs/BsClipboard"
    import BsCheck2 from "svelte-icons-pack/bs/BsCheck2"
    import toast from 'svelte-french-toast';
    let copied = false

	function copyText() {
        const CodeBlock = document.getElementById("code-block");
        console.log(CodeBlock)
        const text = CodeBlock?.innerText;
        console.log(text)

        navigator.clipboard.writeText(text!)
        .then(() => {
            toast.success("Text copied to clipboard!");
        })
        .catch((error) => {
            toast.error("Error copying text")
            console.log("Error copying text: ", error)
        });

        copied = true;
    }
</script>

<div>
    <div class="top-bar">
        <div>
            <h3>Language</h3>
        </div>
        <div>
            {#if !copied}
                <button on:click={copyText} class="copy-button"><Icon src={BsClipboard} className="my-auto" />Copy Code</button>
            {:else}
                <button on:click={copyText} class="copy-button"><Icon src={BsCheck2} className="my-auto" />Copied</button>
            {/if}
        </div>
    </div>
    <pre id="code-block">
        <code>
            <slot />
        </code>
    </pre>
</div>


<style>
    .top-bar {
        width: 100%;
        background: #353541;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-size: 13px;
        color: rgb(229 231 235);
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 5px;
        padding-left: 15px;
        padding-right: 15px;
        user-select: none;
    }
    .copy-button {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
    pre { 
        font-size: medium;
        background: #000000;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>