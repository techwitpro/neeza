let lenisInstance: any = null;

export const setLenisInstance = (instance: any) => {
  lenisInstance = instance;
};

export const getLenisInstance = () => lenisInstance;

export const smoothScrollTo = (target: string, offset: number = -67) => {
  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    lenisInstance.scrollTo(target, { offset });
  } else if (typeof document !== "undefined") {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};
