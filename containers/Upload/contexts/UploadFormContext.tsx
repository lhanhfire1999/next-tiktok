import React, { createContext, useContext } from 'react'
import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form'
import { AllowUserMode, WatchMode } from '~/services/upload'

interface FormValues {
  caption: string
  watchMode: WatchMode
  allowUserMode: AllowUserMode[]
  uploadVideo: FileList | null
}

interface ContextProp {
  register: UseFormRegister<FormValues>
  control: Control<FormValues, any>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  reset: UseFormReset<FormValues>
  getValues: UseFormGetValues<FormValues>
  setValue: UseFormSetValue<FormValues>
  resetField: UseFormResetField<FormValues>
}

interface FormProviderProp {
  children: React.ReactNode
}

const Context = createContext<ContextProp | null>(null)

export const UploadFormProvider: React.FC<FormProviderProp> = ({ children }) => {
  const { control, register, handleSubmit, reset, getValues, setValue, resetField } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      caption: '',
      watchMode: '0',
      allowUserMode: ['0', '1', '2'],
      uploadVideo: null,
    },
  })

  return (
    <Context.Provider value={{ control, register, handleSubmit, reset, getValues, setValue, resetField }}>
      {children}
    </Context.Provider>
  )
}

export const useUploadForm = () => useContext(Context) as ContextProp
