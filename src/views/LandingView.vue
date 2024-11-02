<template>
	<div class="landing">
		<div class="landing__header">
			<div class="landing__header__title">
				<h1>Talestack</h1>
				<div>weave your content into continous stories</div>
			</div>
			<div class="landing__header__login">
				<v-card class="landing__header__login-card">
					<v-card-text>
						<v-text-field v-model="email" label="email" variant="outlined" />
						<v-text-field v-model="password" label="password" variant="outlined" type="password" />
						<v-btn color="#ee732f" block @click.stop="login">
							<strong>Login</strong>
						</v-btn>
						<div class="landing__header__login-card__divider">
							<hr />
							<span> OR </span>
							<hr />
						</div>
						<v-btn class="text-none landing__header__login-card__googleBtn" variant="plain" block @click.stop="signInWithGoogle">
							<img :src="googleLogo">
							Login with google
						</v-btn>
						<v-btn class="text-none landing__header__login-card__forgotBtn" variant="plain" block @click.stop="forgotPassword">
							Forgot password?
						</v-btn>
					</v-card-text>
				</v-card>
			</div>
		</div>
		<div class="landing__footer">
			Talestack © 2024
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import googleLogo from '@/assets/logo-google.png'
import { UserService } from '@/api/UserService'

const profileService = new UserService()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const login = () => {
	loading.value = true
	signInWithEmailAndPassword(getAuth(), email.value, password.value)
		.then(async (data: any) => {
			localStorage.setItem('token', data.user.accessToken)
			loading.value = false
			let res: any = await profileService.fetchUserInfo(data.user.uid)
			if (res.success) {
				if (res.data.isOnboarded) {
					router.replace('/home')
					authStore.authenticate(true)
				} else {
					router.replace('/onboarding')
				}
			} else {
				location.reload()
			}
		})
		.catch((err) => {
			console.log(err)
			loading.value = false
			error.value = err
		})
}

const signInWithGoogle = () => {
	const provider = new GoogleAuthProvider()
	signInWithPopup(getAuth(), provider)
		.then(async (data: any) => {
			console.log('successfully logged in')
			localStorage.setItem('token', data.user.accessToken)
			loading.value = false
			let res: any = await profileService.fetchUserInfo(data.user.uid)
			if (res.success) {
				if (res.data.isOnboarded) {
					router.replace('/home')
					authStore.authenticate(true)
				} else {
					router.replace('/onboarding')
				}
			} else {
				location.reload()
			}
		})
		.catch((err) => {
			console.log(err)
			loading.value = false
			error.value = err
		})
}

const forgotPassword = () => {}
</script>

<style lang="scss" scoped>
.landing {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	&__header {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: space-around;
		margin: auto;
		width: 100%;
		padding: 0 12.5%;
		background: #f2f4f7;
		&__title {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 50%;
			& > h1 {
				font-size: 64px;
			}
			& > div {
				font-size: 32px;
			}
		}
		&__login {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 50%;
			&-card {
				width: 80%;
				text-align: center;
				border-radius: 8px;
				padding: 4px 0;
				&__divider {
					display: flex;
					gap: 16px;
					width: 100%;
					margin-top: 32px;
					align-items: center;
					& > hr {
						flex-grow: 1;
						border-top: 0;
						border-color: rgb(219, 219, 219);
					}
				}
				&__googleBtn {
					margin-top: 24px;
					img {
						width: 20px;
						aspect-ratio: 1/1;
						margin-right: 4px;
					}
				}
				&__forgotBtn {
					margin-top: 8px;
				}
			}
		}
	}
	&__footer {
		height: 10vh;
		margin: auto;
		width: 75%;
		display: flex;
  	align-items: center;
	}
}
</style>