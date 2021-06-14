import { convertFromRaw, RawDraftContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const convertJsonObjectToHtml = (postBody: any) => {
  const rawState = convertFromRaw({
    ...({ entityMap: {}, ...postBody } as unknown as RawDraftContentState),
  });
  const htmlBody = stateToHTML(rawState, {
    blockRenderers: {
      'header-one': (block) => `<h4>${block.getText()}</h4>`
    },
    entityStyleFn: (entity) => {
      const entityType = entity.getType().toLowerCase();
      if (entityType === 'image') {
        const data = entity.getData();
        return {
          element: 'img',
          attributes: {
            src: data.src,
            class: 'img-fluid'
          },
          style: {

          }
        };
      }
      return undefined;
    }
  });

  return htmlBody;
};
export default convertJsonObjectToHtml;
