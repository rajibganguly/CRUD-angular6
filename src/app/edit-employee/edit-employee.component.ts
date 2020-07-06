import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
// import { Observable } from 'rxjs';
import { Employee, Location } from '../employee/employee.module';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.sass']
})
export class EditEmployeeComponent implements OnInit {
  employeeEditLists = [];
  contactForm: FormGroup;
  allGetData;
  allGetDataArr = [];
  display = true;
  // subscription: Subscription;

  constructor(private appService: AppService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router) {
      
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.display = true;
      const getIdDet = +param.get('id');
      if(getIdDet) {
        this.getDetailsOf(getIdDet);
      }
    });
    

    this.contactForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
      category: new FormControl(''),
      skills: new FormControl(''),
      locations: this.fb.array([
        this.addlocationFormGroup()
      ])
    });
  }

  addlocationFormGroup(): FormGroup {
    return this.fb.group({
      enddate: [''],
      lacation: [''],
      project: [''],
      projectcode: [''],
      startdate: ['']
    })
  }

// create a get employee
getDetailsOf(id: number) {
  this.appService.getEmployeeById(id).subscribe((employee: Employee) => {
        this.getEmployeeBind(employee);
        console.log(employee);
      },
      (err: any) => console.log(err))
      
}
getEmployeeBind(employee: Employee) {
  this.contactForm.patchValue({
    id: employee.id,
    name: employee.name,
    address: employee.address,
    category: employee.category,
    skills: employee.skills
  })

  this.contactForm.setControl('locations', this.settleFromArray(employee.locations));
}

settleFromArray(setLocations: Location[]): FormArray {
  const myFormArr = new FormArray([]);
  setLocations.forEach((loc) => {
    myFormArr.push(this.fb.group({
      enddate: loc.enddate,
      lacation: loc.lacation,
      project: loc.projectcode,
      projectcode: loc.projectcode,
      startdate: loc.startdate
    }));
  });
  return myFormArr;
}


  saveEmployee(x: any) {
    console.log(x.value);
    this.employeeEditLists = [];
    this.employeeEditLists.push(x.value);
    this.display = true;
    this.appService.editEmployee(this.employeeEditLists[0]).subscribe((data) => {
      this.display = false;
      this.router.navigate(['/']);
    },
    (error) => console.log(error));
    this.display = true;
  }

  backToHome() {
    alert('No new data to save!');
    this.router.navigate(['/']);
  }




}