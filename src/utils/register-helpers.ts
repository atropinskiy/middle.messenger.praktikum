import Handlebars from 'handlebars';

export const registerHelpers = (): void => {
  Handlebars.registerHelper('eq', function (a: any, b: any) {
    return a === b;
  });

  Handlebars.registerHelper("neq", function (a: any, b: any) {
    return a !== b;
  });
  
  Handlebars.registerHelper("startsWith", function (
    this: any, // тип для контекста
    value: string,
    searchString: string
  ): boolean {
    if (typeof value === "string" && value.startsWith(searchString)) {
      return true; // Возвращаем true для успешного совпадения
    }
    return false; // Возвращаем false, если не совпадает
  });
};
