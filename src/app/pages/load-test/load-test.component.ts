import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from 'src/app/constants/routes';
import { Test } from 'src/app/model/test';
import { TestCollectionStoreService } from 'src/app/services/test-collection-store/test-collection-store.service';

@Component({
  selector: 'app-load-test',
  templateUrl: './load-test.component.html',
  styleUrls: ['./load-test.component.scss'],
})
export class LoadTestComponent implements OnInit {
  testCollection$!: Observable<Test[]>;

  constructor(
    private testCollectionStore: TestCollectionStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testCollection$ = this.testCollectionStore.testCollection$;
  }

  takeTest(uuid: string): void {
    this.testCollectionStore.selectTest(uuid);
    this.router.navigate([AppRoutes.TakeTest]);
  }

  editTest(test: Test): void {
    this.testCollectionStore.setEditTest(test);
    this.router.navigate([AppRoutes.MakeTest]);
  }

  deleteTest(uuid: string): void {
    this.testCollectionStore.deleteTest(uuid);
  }

  downloadJson(uuid: string): void {
    this.testCollectionStore.downloadJson(uuid);
  }

  onFileSelected(event: any): void {
    const files: File[] = event.target.files;
    for (const file of files) this.loadFile(file);
  }

  private loadFile(file: File): void {
    if (file) {
      const reader = new FileReader();
      let jsonData: Test | undefined = undefined;
      reader.onload = (e) => {
        const result = e.target?.result as string;
        jsonData = JSON.parse(result);

        if (jsonData) {
          this.testCollectionStore.addTest(jsonData);
        } else alert('Ha ocurrido un error leyendo el archivo ' + file.name);
      };

      reader.readAsText(file);
    }
  }

  goToMakeTest(): void {
    this.router.navigate([AppRoutes.MakeTest]);
  }
}
