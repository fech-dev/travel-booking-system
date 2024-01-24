export type DeepKeyOf<O extends object> = {
  [Key in keyof O]: O[Key] extends object
    ? `${Key}` | `${Key}.${DeepKeyOf<O[Key]>}`
    : Key;
}[keyof O];
