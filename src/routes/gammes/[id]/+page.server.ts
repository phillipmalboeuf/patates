
import type { TypeGammeSkeleton, TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'



export const load = async ({ request, params, cookies }) => {

  const [items] = await Promise.all([
    content.getEntries<TypeGammeSkeleton>({ content_type: 'gamme', include: 2, "fields.id": params.id, locale: 'fr-CA' }),
  ])

  return {
    item: items.items[0],
  }
}