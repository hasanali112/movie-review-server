import bycrypt from 'bcryptjs'

export const isMatchPassword = async (
  plainPassword: string,
  hasPassword: string,
) => {
  const isMatch = await bycrypt.compare(plainPassword, hasPassword)
  return isMatch
}
