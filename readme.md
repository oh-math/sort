# Documentação da funcionalidade da ordenação

### Váriaveis

**`sortedByName`** - Objeto ordenado pela precência principal

**`finalSortedResult`** - Objeto final ordenado

---

### Funções

**_orderByGroupedvalue_** - Ordena por grupo CASO os grupos existam no objeto

```ts
// CASO exista o grupo `maisInfo`, ordena por `machucados`
(value.maisInfo && value.maisInfo?.machucados) ||
  // CASO exista o grupo `valor`, ordena por `valor`
  (value.valor && value.valor);
```

**_orderWithoutGroupedValue_** - Ordena SEM grupo QUANDO os agrupamentos não existem

**_decideSort_** - Decide qual ordenação obter

```ts
// CASO não exista agrupamento, retorna ordenado sem os grupos
if (personalidadeGroupingNotExists) {
  return [...orderWithoutGroupedValue(lesao.personalidade)];
  // CASO exista agrupamento, retorna ordenado por eles
} else {
  return [
    ...groupedBySorted.map((personalidade) => ({
      ...personalidade,
      hobbies: orderWithoutGroupedValue(personalidade.hobbies),
    })),
  ];
}
```
