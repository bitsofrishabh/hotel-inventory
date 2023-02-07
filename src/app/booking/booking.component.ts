import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from './validators/custom-validators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  bookingFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  get guests() {
    return this.bookingFormGroup.get('guests') as FormArray;
  }

  ngOnInit(): void {
    const roomid = this.route.snapshot.paramMap.get('roomid');
    this.bookingFormGroup = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomid, disabled: false },
          { validators: [Validators.required] }
        ),
        guestEmail: ['', [Validators.required, Validators.email]],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.maxLength(10), Validators.required],
          },
        ],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidators.ValidateName,
            CustomValidators.ValidateSpecialChar('*'),
          ],
        ],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: ['', { validators: [Validators.required] }],
          zipcode: ['', { validators: [Validators.required] }],
        }),
        guests: this.fb.array([
          this.fb.group({
            guestName: ['', { validators: [Validators.required] }],
            age: new FormControl(),
          }),
        ]),
      },
      { updateOn: 'blur', validators: [CustomValidators.validateDate] }
    );
  }

  addBooking() {
    console.log(this.bookingFormGroup.value);
    this.bookingFormGroup.reset();
    this.bookingFormGroup.markAsUntouched();
  }

  addGuest() {
    this.guests.push(
      this.fb.group({
        guestName: [''],
        age: new FormControl(),
      })
    );
  }

  addPassport() {
    this.bookingFormGroup.addControl('passport', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingFormGroup.get('passport')) {
      this.bookingFormGroup.removeControl('passport');
    }
  }
  removeGuest(i: any) {
    this.guests.removeAt(i);
  }
}
