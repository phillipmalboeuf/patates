
import type { TypeGammeSkeleton, TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'



export const load = async ({ request, params, cookies }) => {

  const [items] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 2, "fields.id": params.id, locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    page: items.items[0],
  }
}