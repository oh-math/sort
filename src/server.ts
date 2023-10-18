import { highlight } from "cli-highlight";
import sortBy from "lodash.sortby";
import { lesoes, lesoesMachucados, lesoesValor } from "./jsons/mainJson";

const orderByGroupedvalue = (groupedValueExists: boolean, lesaoObj) => {
  if (groupedValueExists) {
    return sortBy(
      lesaoObj.personalidade,
      (value) =>
        (value.maisInfo && value.maisInfo?.machucados) ||
        (value.valor && value.valor)
    );
  }

  return [];
};

const orderWithoutGroupedValue = (lesaoObj) => {
  return sortBy(lesaoObj, (value) => [
    value?.tipo,
    value?.status,
    value?.complemento,
    value?.variacao,
  ]);
};

const decideSort = (lesao) => {
  const personalidadeGroupingNotExists =
    !lesao.personalidade[0]?.maisInfo && !lesao.personalidade[0]?.valor;

  const groupedBySorted = orderByGroupedvalue(
    !personalidadeGroupingNotExists,
    lesao
  );

  if (personalidadeGroupingNotExists) {
    return [...orderWithoutGroupedValue(lesao.personalidade)];
  } else {
    return [
      ...groupedBySorted.map((personalidade) => ({
        ...personalidade,
        hobbies: orderWithoutGroupedValue(personalidade.hobbies),
      })),
    ];
  }
};

const sortedResult = (obj) => {
  const sortedByName = sortBy(obj, ["nome"]);

  return sortedByName.map((lesao) => {
    return {
      ...lesao,
      personalidade: decideSort(lesao),
    };
  });
};

console.log(
  highlight(JSON.stringify(sortedResult(lesoesValor), null, 4), { language: "json" })
);

