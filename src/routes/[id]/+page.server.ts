
import type { TypeGammeSkeleton, TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'



export const load = async ({ request, params, cookies }) => {

  const [items] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 2, "fields.id": params.id, locale: 'fr-CA' }),
  ])

  return {
    page: items.items[0],
  }
}