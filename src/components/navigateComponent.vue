<template>
  <nav class="navigate">
    <ul>
      <li>
        <router-link to="/"> <i class="fad fa-home"></i>INICIO </router-link>
      </li>
      <li>
        <router-link to="/collaborators">
          <i class="fad fa-user-group"></i>COLABORADORES
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <i class="fad fa-circle-info"></i>ACERCA DE
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.navigate {
  background: #2d2d2d;
  width: 100%;
  border-top: 1px solid invert(#2d2d2d);
  @media screen and (min-width: 768px) {
    width: 15rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    @media screen and (min-width: 768px) {
      flex-direction: column;
    }
    li {
      line-height: 100%;
      margin: 0.25rem;
      display: flex;
      flex: 1;
      text-align: center;
      @media screen and (min-width: 768px) {
        margin: 1rem 1rem 0 1rem;
        text-align: left;
      }

      a {
        width: 100%;
        padding: 0.75rem 1rem;
        color: white;
        font-size: 1rem;
        border-radius: 0.25rem;
        flex: 1;
        i {
          margin-right: 0.5rem;
          display: none;
          @media screen and (min-width: 768px) {
            display: inline;
          }
        }

        &:hover {
          background: rgba(#dc0000, 0.1);
        }
      }
    }
  }
}
</style>
