import React, { createContext, useContext } from 'react'
import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form'
import { AllowUserModeList, UPLOAD_PAGE_FORM_CONTAINER, WatchMode } from '~/constants'

interface FormValues {
  caption: string
  watchMode: WatchMode
  allowUserMode: AllowUserModeList
}

interface ContextProp {
  register: UseFormRegister<FormValues>
  control: Control<FormValues, any>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  reset: UseFormReset<FormValues>
  getValues: UseFormGetValues<FormValues>
  setValue: UseFormSetValue<FormValues>
}

interface FormProviderProp {
  children: React.ReactNode
}

const Context = createContext<ContextProp | null>(null)

export const UploadFormProvider: React.FC<FormProviderProp> = ({ children }) => {
  const { control, register, handleSubmit, reset, getValues, setValue } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      caption: '',
      watchMode: 'Public',
      allowUserMode: [...UPLOAD_PAGE_FORM_CONTAINER.allowUser.data],
    },
  })
  return (
    <Context.Provider value={{ control, register, handleSubmit, reset, getValues, setValue }}>
      {children}
    </Context.Provider>
  )
}

export const useUploadForm = () => useContext(Context) as ContextProp
