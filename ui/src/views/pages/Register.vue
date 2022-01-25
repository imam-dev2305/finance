<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="6"
      >
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              :complete="step > 1"
              step="1"
            >
              Profile
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="2"
            >
              Country
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form
                ref="profile"
                lazy-validation
              >
                <v-text-field
                  v-model="frm.name"
                  :rules="rules.name"
                  label="Name"
                ></v-text-field>

                <v-text-field
                  v-model="frm.email"
                  type="email"
                  :rules="rules.email"
                  :error-messages="error.email"
                  :error-count="error.email.length"
                  label="Email"
                >
                </v-text-field>

                <v-text-field
                  :append-icon="password_visible ? 'mdi-eye':'mdi-eye-off'"
                  :type="password_visible ? 'text':'password'"
                  v-model="frm.password"
                  :rules="rules.password"
                  label="Password"
                  @click:append="password_visible = !password_visible"
                ></v-text-field>
              </v-form>

              <v-toolbar>
                <v-btn
                  :to="{name: 'pages-login'}"
                >
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="nextStep"
                >
                  Continue
                </v-btn>
              </v-toolbar>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-form
                ref="currencies"
                lazy-validation
              >
                <v-select
                  v-model="frm.base_currency"
                  :rules="rules.base_currency"
                  :items="currencies"
                  item-value="code"
                  item-text="country"
                  placeholder="Country"
                ></v-select>
              </v-form>

              <v-toolbar>
                <v-btn
                  @click="step = 1"
                >
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  @click="submitForm"
                >
                  Submit
                </v-btn>
              </v-toolbar>
            </v-stepper-content>

          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // eslint-disable-next-line object-curly-newline

  export default {
    name: 'Register',
    data() {
      return {
        step: 1,
        frm: {
          name: '',
          email: '',
          base_currency: '',
          password: '',
        },
        rules: {
          name: [
            v => !!v || 'name is required',
          ],
          email: [
            v => !!v || 'email is required',
            v => /.+@.+\..+/.test(v) || 'email must be valid',
          ],
          password: [
            v => !!v || 'password is required',
            v => (v && v.length <= 15) || 'password must less than 15 characters'
          ],
          base_currency: [
            v => !!v || 'currency is required',
          ],
        },
        error: {
          email: '',
        },
        password_visible: false,
        currencies: [],
      }
    },
    mounted() {
      this.getCurrencies();
    },
    methods: {
      getCurrencies() {
        axios.get('country/get')
        .then((response) => {
          const data = JSON.stringify(response.data.data)
          this.currencies = JSON.parse(data)
        })
      },

      nextStep() {
        if (this.$refs.profile.validate()) {
          axios.post('regis_validation', this.frm)
            .then((response) => {
              this.step += 1
            })
            .catch((e) => {
              const data = e.response.data
              Object.keys(this.error).forEach((key) => {
                if (key in data.message) {
                  this.error[key] = data.message[key]
                } else {
                  this.error[key] = ''
                }
              })
            })
        }
      },

      submitForm() {
        if (this.$refs.currencies.validate()) {
          axios.post('regis', this.frm)
          .then((response) => {
            const data = response.data.data
            this.$store.commit('USER_LOGIN', data)
            this.$router.push('/')
          })
        }
      },
    }
  }
</script>

<style lang="scss">
  @import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
