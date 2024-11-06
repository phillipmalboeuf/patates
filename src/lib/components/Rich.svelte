<script lang="ts">
  import type { Document } from '@contentful/rich-text-types'
  import Media from './Media.svelte'
  import Scrollin from './Scrollin.svelte'

  let { body, scrollin }: { body: Document, scrollin?: boolean } = $props()
</script>

{#snippet ma(mark)}
{#if mark.nodeType === 'text'}
{#if mark.marks.length > 0}
  {#if mark.marks[0].type === 'italic'}
  <em>{@render ma({ ...mark, marks: mark.marks.slice(1) })}</em>
  {:else if mark.marks[0].type === 'bold'}
  <strong>{@render ma({ ...mark, marks: mark.marks.slice(1) })}</strong>
  {:else if mark.marks[0].type === 'underline'}
  <u>{@render ma({ ...mark, marks: mark.marks.slice(1) })}</u>
  {:else if mark.marks[0].type === 'subscript'}
  <small class="sub">{@render ma({ ...mark, marks: mark.marks.slice(1) })}</small>
  {:else if mark.marks[0].type === 'supscript'}
  <small class="sup">{@render ma({ ...mark, marks: mark.marks.slice(1) })}</small>
  {:else if mark.marks[0].type === 'code'}
  {@html mark.value}
  {/if}
{:else}
{@html mark.value}
{/if}
{:else if mark.nodeType === 'hyperlink'}
<a href="{mark.data.uri}" target="{mark.data.uri.indexOf('http') === 0 ? '_blank' : '_self'}">
  {#each mark.content as _mark}{@render ma(_mark)}{/each}
</a>
{:else if mark.nodeType === 'asset-hyperlink'}
<a href="{mark.data.target.fields.file.url}" target="_blank">
  {#each mark.content as _mark}{@render ma(_mark)}{/each}
</a>
{/if}
{/snippet}

{#snippet m(mark, index)}
{#if scrollin}
<Scrollin delay={index * 250}>{@render ma(mark)}</Scrollin>
{:else}
{@render ma(mark)}
{/if}
{/snippet}

{#snippet n(node, index=undefined)}
{#if node.nodeType === 'heading-1'}
  <h1>{#each node.content as mark}{@render m(mark, index)}{/each}</h1>
{:else if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}{@render m(mark, index)}{/each}</h2>
{:else if node.nodeType === 'heading-3'}
  <h3>{#each node.content as mark}{@render m(mark, index)}{/each}</h3>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each node.content as mark}{@render m(mark, index)}{/each}</h4>
{:else if node.nodeType === 'heading-5'}
  <h5>{#each node.content as mark}{@render m(mark, index)}{/each}</h5>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}{@render m(mark, index)}{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}{@render m(mark, index)}{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}{@render n(node)}{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'ordered-list'}
  <ol>
    {#each node.content as item}<li>{#each item.content as node}{@render n(node)}{/each}</li>{/each}
  </ol>

{:else if node.nodeType === 'table'}
  <table>
    <tbody>
    {#each node.content as item}<tr>{#each item.content as node, i}{@render n(node, i)}{/each}</tr>{/each}
    </tbody>
  </table>
{:else if node.nodeType === 'table-header-cell'}
  <th data-content="{node.content[0]?.content[0]?.value}">{#each node.content as item}{@render n(item, index)}{/each}</th>
{:else if node.nodeType === 'table-cell'}
  <td>{#each node.content as item}{@render n(item, index)}{/each}</td>

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}{@render n(code)}{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
  <figure>
    <Media media={node.data.target} />
    {#if node.data.target.fields.description}
    <figcaption>{node.data.target.fields.description}</figcaption>
    {/if}
  </figure>
{:else if node.nodeType === 'embedded-entry-block'}
{/if}
{/snippet}

{#each body.content as node}
{@render n(node)}
{/each}