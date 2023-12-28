\
<template>
  <h1>{{ data.type }} Profile</h1>
  <template v-if="data.loading"></template>
  <template v-else>
    <div class="profile__container">
      <div class="profile__info">
        <div class="profile__info__image">
          <img :src="data.profile.profileImageUrl" alt="profilePic" />
          <v-btn class="profile__info__image__btn" v-if="isMyProfile" flat color="#ee732f">
            Edit
          </v-btn>
          <v-btn class="profile__info__image__btn" v-else-if="data.profile.isFollowing" flat>
            Unfollow
          </v-btn>
          <v-btn class="profile__info__image__btn" v-else variant="flat" color="#ee732f">
            Follow
          </v-btn>
        </div>
        <div class="profile__info__content">
          <div class="profile__info__data">
            <p>{{ data.profile.name }}</p>
            <p>{{ data.profile.email }}</p>
            <div class="profile__info__data__con">
              <div class="profile__info__data__count">
                <h2>{{ data.profile.followers }}</h2>
                <p>Followers</p>
              </div>
              <div class="profile__info__data__count">
                <h2>{{ data.profile.following }}</h2>
                <p>Following</p>
              </div>
              <div class="profile__info__data__count">
                <h2>{{ data.profile.tales }}</h2>
                <p>Tales</p>
              </div>
            </div>
          </div>
          <div class="profile__info__tagline">
            {{ data.profile.tagline }}
          </div>
        </div>
      </div>
      <div class="profile__bio">
        {{ data.profile.bio }}
      </div>
      <hr class="profile__divider" />
      <div class="profile__content">
        <TaleList :tales="data.tales" :is-user-tale="userId === userData['uid']" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { TaleService } from '@/api/TaleService'
import { UserService } from '@/api/UserService'
import TaleList from '@/components/TaleList.vue'
import { useAuthStore } from '@/stores/auth'
import tale from '@/test-data/tale'
import user from '@/test-data/user'
import { onMounted } from 'vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const data = reactive({
  profile: {
    followers: 0,
    following: 0,
    tales: 0,
    profileImageUrl: '',
    name: '',
    tagline: '',
    bio: '',
    email: '',
    isFollowing: false
  },
  tales: [],
  type: '',
  loading: true
})

const profileService = new UserService()
const taleService = new TaleService()
const authStore = useAuthStore()
const route = useRoute()
const userId: string = route.params.id as string
const userData: any = authStore.user
const isMyProfile: Boolean = userId === userData['uid']

onMounted(async () => {
  try {
    let res: any = await profileService.fetchUserInfo(userId)
    let taleRes: any = await taleService.fetchUserTales(userId, 0)
    if (res['success']) {
      const talss: any = tale
      const userr: any = user.userInfo
      data.profile = userr || res['data']
      data.tales = talss || taleRes['data']
      data.type = isMyProfile ? 'My' : `${data.profile.name || 'Talestack User'}'s`
    }
    data.loading = false
  } catch (e) {
    console.log(e)
    data.loading = false
  }
})
</script>

<style lang="scss" scoped>
.profile {
  &__container {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }

  &__info {
    display: flex;

    &__image {
      width: 30%;
      margin: auto;
      text-align: center;
      gap: 16px;
      display: flex;
      margin-bottom: 24px;
      flex-direction: column;
      & > img {
        width: 60%;
        aspect-ratio: 1/1;
        border-radius: 100%;
        margin: auto;
      }

      &__btn {
        width: 40%;
        margin: auto;
      }
    }

    &__content {
      width: 70%;
      padding-left: 2.5%;
      display: flex;
      flex-direction: column;
    }

    &__data {
      display: flex;
      width: 33%;
      flex-direction: column;
      gap: 8px;
      &__con {
        display: flex;
        flex-direction: row;
        gap: 10%;
      }
    }

    &__tagline {
      margin-top: 24px;
    }
  }
}

hr.profile__divider {
  height: 1px;
  margin: 50px 0;
  background: -webkit-gradient(
    linear,
    0 0,
    100% 0,
    from(rgba(0, 0, 0, 0)),
    color-stop(0.5, #333333),
    to(rgba(0, 0, 0, 0))
  );
  background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0), #333333, rgba(0, 0, 0, 0));
  background: -moz-linear-gradient(left, rgba(0, 0, 0, 0), #333333, rgba(0, 0, 0, 0));
  background: -o-linear-gradient(left, rgba(0, 0, 0, 0), #333333, rgba(0, 0, 0, 0));
  background: linear-gradient(left, rgba(0, 0, 0, 0), #333333, rgba(0, 0, 0, 0));
  border: 0;
}
</style>
