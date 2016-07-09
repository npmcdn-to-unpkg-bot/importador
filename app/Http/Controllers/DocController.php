<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class DocController extends Controller
{

    protected $htmlDoc;
    public $dataGrid;
    public $jsonDataGrid;
    public function __construct()
    {
        $this->htmlDoc='';
        $this->dataGrid=array();
        $this->jsonDataGrid=array();
    }

    public function index()
    {
        $this->loadCvs();
        //$view = View::make('main', array('name' => 'Taylor'));
        return View('main',array('name' => $this->htmlDoc));
        //return view:make('main',array('cvsJsonData'=>$this->dataGrid));
    }

    public function test()
    {

        $this->loadCvs();
        return $this->htmlDoc;
    }

    public function cvson()
    {
        $temp = $this->loadCvs();
        return response()->json(['status'=>'ok','data'=>$this->htmlDoc ], 200);
    }

    public function loadCvs()
    {
        $fila = 1;
        $this->pushText('[');
        if (($gestor = fopen("docs/documento base.csv", "r")) !== FALSE)
        {
            while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE)
            {
                foreach ($datos as $key => $value)
                {

                    if( mb_detect_encoding($value) ==='UTF-8')
                        $datos[$key]=utf8_encode($value);
                }
                if($fila>1)
                    $this->pushText(',');
                $this->pushText(json_encode($datos));
                $this->dataGrid[]=$datos;
                $fila++;
            }

            fclose($gestor);
        }
        $this->pushText(']');
    }

    private function pushText($newHtml)
    {
        $this->htmlDoc=$this->htmlDoc.$newHtml;
    }

    public function bindHtml()
    {

        $this->pushText('<table>');
        foreach ($this->dataGrid as $key => $value)
        {
            $this->pushText('<tr>');
            foreach ($value as $key2 => $value2)
            {
               $this->pushText('<td>'.$value2.'<td>');
            }
            $this->pushText('</tr>');
        }
        $this->pushText('</table>');

    }

}
