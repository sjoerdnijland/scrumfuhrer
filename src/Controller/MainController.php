<?php
/**
 * Created by PhpStorm.
 * User: nyland
 * Date: 28/05/2018
 * Time: 10:27
 */
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class MainController extends Controller
{
    /**
     * @param Request
     * @Route("/", name="app")
     * @Method("GET")
     */
    public function renderApp(Request $request)
    {
        # may be used to prepopulate UX data
        $output['data'] = [];
        # render the APP (default)
        return $this->render('app.html.twig', $output);
    }

}