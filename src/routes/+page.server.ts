
import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { email } from '$lib/clients/postmark'
import { languageTag } from '$lib/paraglide/runtime'
import type { Actions } from './$types'


export const load = async ({ request, cookies }) => {

  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 3, "fields.id": "accueil", locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    page: page.items[0],
  }
}

export const actions = {
	contact: async (event) => {
		const data = Object.fromEntries(await event.request.formData())

    // console.log(data)

    await email.sendEmailWithTemplate({
        From: 'phil@phils.computer',
        To: 'info@propur.com',
        MessageStream: 'broadcast',
        ReplyTo: data.email as string,
        TemplateAlias: 'base',
        TemplateModel: {
          subject: `Commentaire`,
          body: `${data.message}<br><br>${data.nom} – ${data.email} ${data.phone}`,
          product_url: "https://mamzells.com",
          product_name: "Mamzells",
          company_name: "Mamzells",
          company_address: ""
        },
        ...(data.fichiers && (data.fichiers as File).size) ? { Attachments: [{
          Name: (data.fichiers as File).name,
          ContentID: `cid:${(data.fichiers as File).name}`,
          Content: Buffer.from((await (data.fichiers as File).arrayBuffer())).toString('base64'),
          ContentType: (data.fichiers as File).type
        }] } : {}
      })

    return {
      success: true,
      nom: data.nom,
      email: data.email,
      message: data.message
    }
	}
} satisfies Actions