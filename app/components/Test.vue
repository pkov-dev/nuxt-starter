<template>
  <article class="card">
    <div class="card__content">
      <h2 class="card__title">
        Title
      </h2>

      <p class="card__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum numquam qui dignissimos, accusamus, quos necessitatibus, quod sed cum dolor autem esse nostrum est illo nam distinctio. Numquam adipisci amet ducimus ex dolorum velit natus distinctio saepe ad ratione, repellat modi voluptates culpa hic. Tenetur, porro, provident assumenda repudiandae explicabo nemo temporibus voluptate praesentium beatae quia aperiam non minima ipsam, nisi iusto nesciunt veniam dolores deleniti molestias? Natus nisi hic libero ullam veritatis, aut ad velit ipsam laudantium sapiente eaque consectetur deserunt repudiandae, reiciendis dolorem fugit quisquam quis ratione voluptate, itaque laborum esse delectus nihil similique! Necessitatibus ipsum eveniet natus, enim inventore temporibus exercitationem eos quaerat distinctio quo placeat pariatur? Adipisci tempore totam, voluptatum a voluptatem omnis delectus! Velit nemo suscipit unde ullam mollitia non nulla exercitationem repudiandae iste nam! Ipsum iste consequuntur, ullam qui earum laudantium nemo sint? Modi, doloribus. Autem exercitationem ea enim impedit repudiandae odit voluptatibus, quam soluta culpa in magnam dolorum. Dolorem provident sunt illum ducimus iusto mollitia voluptatem, odio odit quod blanditiis incidunt error porro unde omnis architecto. Mollitia, quod? Voluptas dolorem magnam porro officia? Veritatis ab ad laboriosam distinctio a veniam explicabo! Hic sed aperiam, facere porro minima nemo omnis consequuntur culpa quisquam necessitatibus, ipsum nisi eum! Corporis, sequi repellat? Quis, perferendis temporibus molestiae nostrum provident in corporis aperiam libero maxime, ducimus assumenda ullam. Ratione veritatis quasi quidem tenetur reiciendis repellendus architecto porro delectus voluptas earum! Alias ipsam harum quo, aperiam architecto, consequatur libero tempora temporibus, neque at magnam quos! Minus cupiditate impedit tempore! Porro, necessitatibus, alias exercitationem temporibus maiores nisi dolor ab cumque nesciunt, illo provident accusantium magni! Ipsam quasi minus eveniet architecto voluptatum, soluta facere dignissimos maiores nostrum a fugit suscipit voluptatem saepe optio at, odio nesciunt sequi quibusdam perspiciatis iste pariatur atque. Expedita ea quam eos! Dolores, voluptate suscipit! Architecto, ab eum quos et temporibus, odio ducimus similique sit sed officia asperiores. Dolorum porro ullam velit. Error pariatur libero ex? Doloremque dolorem iusto laudantium sapiente amet rerum deleniti labore! Corrupti facilis nostrum quia in tenetur reiciendis numquam dignissimos? Possimus iure repellat error expedita nobis dolorum blanditiis eius odio officia ipsum eos perferendis at adipisci quibusdam fugit non molestias nemo distinctio perspiciatis, alias ullam. Et dolores corporis, natus nulla, inventore tempore distinctio sequi molestias provident rem vitae incidunt ut? Culpa sint cupiditate dolorem officiis temporibus eveniet natus hic consectetur provident ipsum, reprehenderit magnam eum libero incidunt repellendus corrupti atque beatae. Quas non quae magni ea exercitationem voluptatum quaerat cupiditate assumenda dolores inventore, sequi, maxime accusantium eos sapiente nihil quibusdam sit! Porro omnis quis est reprehenderit perferendis tenetur commodi atque tempore quibusdam illum eius exercitationem eaque, voluptates ipsum veritatis doloremque harum praesentium. Quidem dolor rem maiores laudantium hic, harum magni nobis? Eum explicabo dignissimos rerum voluptatibus eius officia incidunt recusandae animi. Ratione earum accusamus veritatis ducimus sequi, hic, non adipisci rerum perspiciatis rem in accusantium minus quae nesciunt consequatur quidem, saepe id ipsam odit molestias. Deserunt vero nam laudantium maxime rerum. Modi unde totam, minima voluptas aut, esse fugit magni quo consequatur, dolorem repudiandae?
      </p>

      <button class="card__button">
        Learn more
        <Icon name="app:form-success-circle" />
      </button>
    </div>
    <div class="card__img">
      <NuxtImg
        src="/images/main.png"
        width="720"
        height="375"
        sizes="sm:100vw md:50vw lg:720px"
        format="webp"
        loading="lazy"
        alt="hello"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  width: 100%;
  max-width: 80vw;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 16px;
  margin-top: 100px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
  gap: 20px;
  margin-inline: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (width < to-em($md)) {
    flex-direction: column;
  }

  // .card__content
  &__content {
  }

  &__title {
    margin-bottom: 12px;
    font-family: var(--font-heading);
    font-weight: 700;

    @include adaptive-value('font-size', 56, 16, 1, $lg, $xs);

    @media (width < to-em($sm)) {
      color: red;
    }
  }

  &__description {
    margin-bottom: 20px;
    color: #666;
    line-height: 1.5;
  }

  &__button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #222;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  // .card__img
  &__img {
  }
}
</style>
