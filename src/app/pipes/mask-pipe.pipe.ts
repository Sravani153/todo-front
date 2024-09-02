import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPipe'
})
export class MaskPipePipe implements PipeTransform {

  transform(value: string, maskChar: string = '*'): string {
    if (!value) return '';
    return maskChar.repeat(value.length);
  }}


