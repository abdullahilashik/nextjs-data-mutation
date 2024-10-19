"use client"
import {useFormStatus} from 'react-dom';

export default function FormActionButton(){
    const {pending} = useFormStatus();
    return (
        <p className="form-actions">
          <button type="reset" disabled={pending}>Reset</button>
          <button disabled={pending}>
            {pending ? 'Please wait...' : 'Create Post'}
          </button>
        </p>
    );
}