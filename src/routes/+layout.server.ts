
import type { TypeGammeSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'
import type { Entry, Tag } from 'contentful'

export const load = async ({ request, cookies }) => {

  const [navigations, tags, gammes] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.liens'], include: 2, locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
    content.getTags(),
    content.getEntries<TypeGammeSkeleton>({ content_type: 'gamme', include: 1, locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' })
  ])

  return {
    navigations: {
      ...navigations.items.reduce((navs, nav) => {
        return {
          ...navs,
          [nav.fields.id]: nav
        }
      }, {} as {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>}),
    },
    tags: tags.items.reduce((ts, tag) => {
      return {
        ...ts,
        [tag.sys.id]: tag
      }
    }, {} as {[id: string]: Tag}),
    gammes: gammes.items.reduce((gs, gamme) => {
      return {
        ...gs,
        [gamme.fields.id]: gamme
      }
    }, {} as {[id: string]: Entry<TypeGammeSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>})
  }
}