import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() dataSubmitted = new EventEmitter<any>();

  registerForm: FormGroup;
  submitted = false;
  profileImage: File | null = null;
  profileImageBase64: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.profileImage = event.target.files[0];
      if (this.profileImage) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImageBase64 = reader.result;
        };
        reader.readAsDataURL(this.profileImage);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid || !this.profileImage) {
      return;
    }

    const formData = {
      ...this.registerForm.value,
      profileImage: this.profileImageBase64 // Send the Base64 string
    };

    this.dataSubmitted.emit(formData);
  }
}
